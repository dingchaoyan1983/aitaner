import { Component } from 'react';
import { resetFlag401 } from './utils';

export default class extends Component {
  componentDidShow() {
    resetFlag401();
  }
}
