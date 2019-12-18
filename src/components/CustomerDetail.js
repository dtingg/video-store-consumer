import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detailCustomer: {},
    };
  }
}
