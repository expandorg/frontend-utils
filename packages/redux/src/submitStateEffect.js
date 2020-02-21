// @flow
import { Component, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { RequestStates, requestStateProps } from './requestUiState';

type SubmitState = {
  state: string,
  error?: any,
};

type Props = {
  submitState: SubmitState,
  onStart?: (current: SubmitState) => void,
  onComplete?: (current: SubmitState) => void,
  onFailed?: (current: SubmitState) => void,
  children: any,
};

export class SubmitStateEffect extends Component<Props> {
  static propTypes = {
    submitState: requestStateProps.isRequired,
    onStart: PropTypes.func,
    onComplete: PropTypes.func,
    onFailed: PropTypes.func,
  };

  static defaultProps = {
    onStart: null,
    onComplete: null,
    onFailed: null,
  };

  componentDidUpdate({
    submitState: prev,
    onStart,
    onComplete,
    onFailed,
  }: Props) {
    const { submitState } = this.props;
    const wasFetching = prev.state === RequestStates.Fetching;

    if (
      !wasFetching &&
      submitState.state === RequestStates.Fetching &&
      onStart
    ) {
      onStart(submitState);
    }

    if (
      wasFetching &&
      submitState.state === RequestStates.Fetched &&
      onComplete
    ) {
      onComplete(submitState);
    }
    if (
      wasFetching &&
      submitState.state === RequestStates.FetchError &&
      onFailed
    ) {
      onFailed(submitState);
    }
  }

  render() {
    const { children } = this.props;
    if (!children) {
      return null;
    }
    return children;
  }
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export function useSubmitEffect(
  submitState: SubmitState,
  complete: Function,
  failed: Function
) {
  const current = submitState.state;
  const prev = usePrevious(current);

  useEffect(() => {
    if (prev === current) {
      return;
    }
    const prevFetching = prev === RequestStates.Fetching;
    if (prevFetching && current === RequestStates.Fetched) {
      if (complete) {
        complete();
      }
    }
    if (prevFetching && current === RequestStates.FetchError) {
      if (failed) {
        failed();
      }
    }
  }, [complete, failed, current, prev]);
}
