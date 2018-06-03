// @flow
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { runTask, abortTask } from '../../actions';
import { getSelectedProjectId } from '../../reducers/projects.reducer';
import { getTaskByProjectIdAndTaskName } from '../../reducers/tasks.reducer';

import Pane from '../Pane';
import TerminalOutput from '../TerminalOutput';

import type { Task } from '../../types';

type Props = {
  tasks: Array<Task>,
};

class TaskRunnerPane extends PureComponent<Props> {
  render() {
    return (
      <Pane
        title="Tasks"
        primaryActionChildren={'Action'}
        leftSideChildren="Stuff"
        rightSideChildren={<TerminalOutput height={300} logs={[]} />}
      />
    );
  }
}

const mapStateToProps = state => {
  const selectedProjectId = getSelectedProjectId(state);

  // For now, I'm assuming that the dev server task will be named `start`.
  // This is not universally true, not even for Gatsby projects! So this will
  // need to be customizable (or at least based on type).
  const taskName = 'start';

  return {
    task: getTaskByProjectIdAndTaskName(selectedProjectId, taskName, state),
  };
};

const mapDispatchToProps = { runTask, abortTask };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskRunnerPane);