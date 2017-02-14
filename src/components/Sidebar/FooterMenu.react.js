/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import Icon     from 'components/Icon/Icon.react';
import Popover  from 'components/Popover/Popover.react';
import Position from 'lib/Position';
import React    from 'react';
import styles   from 'components/Sidebar/Sidebar.scss';
import ReactDOM from 'react-dom'

export default class FooterMenu extends React.Component {
  constructor(props) {
    super();

    this.clickOrigin = null;
    this.state = {
      show: false,
      position: null,
      arrowAdjustFactor: props.arrowAdjustFactor,
      title: props.title,
      items: props.items,
    };
  }

  toggle() {
    if (!this.state.position) {
      let pos = Position.inWindow(this.clickOrigin);
      pos.x += this.state.arrowAdjustFactor;
      this.setState({
        position: pos,
      });
    }

    this.setState({
      show: true,
    });
  }

  render() {
    let menuContent = null;
    let menuTitle = this.state.title;

    if (!menuTitle) {
      menuTitle = (
        <Icon height={24} width={24} name='ellipses' />
      );
    }

    if (this.state.show && this.state.items) {
      menuContent = (
        <Popover
          fixed={true}
          position={this.state.position}
          onExternalClick={() => this.setState({ show: false })}>
          <div className={styles.popup}>
            { this.state.items.map(this.rowItem) }
          </div>
        </Popover>
      );
    }
    return (
      <a onClick={this.toggle.bind(this)} ref={(a) => {
        this.clickOrigin = a;
      }} className={styles.footer_menu}>
        {menuTitle}
        {menuContent}
      </a>
    );
  }

  rowItem(item) {
    let emoji = null;
    let icon = null;
    let target = item.sameWindow ? '_self' : '_blank';

    if (item.emoji) {
      emoji = (<span className={styles.emoji}>{item.emoji}</span>)
    }
    else if (item.icon) {
      let fill = item.icon.fill ? item.icon.fill : '#000000';
      icon = (
        <Icon height={18} width={18} fill={fill} name={item.icon.name} />
      )
    }

    return (
      <a key={item.title}
        href={item.link}
        target={target}>
        {item.title}
        {emoji}
        {icon}
      </a>
    )
  }
}
