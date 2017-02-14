/*
 * Copyright (c) 2016-present, Parse, LLC
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */
import AppsManager    from 'lib/AppsManager';
import AppsSelector   from 'components/Sidebar/AppsSelector.react';
import FooterMenu     from 'components/Sidebar/FooterMenu.react';
import React          from 'react';
import SidebarHeader  from 'components/Sidebar/SidebarHeader.react';
import SidebarSection from 'components/Sidebar/SidebarSection.react';
import SidebarSubItem from 'components/Sidebar/SidebarSubItem.react';
import styles         from 'components/Sidebar/Sidebar.scss';

let mountPath = window.PARSE_DASHBOARD_PATH;

const Sidebar = ({
  prefix,
  action,
  actionHandler,
  children,
  subsection,
  sections,
  section,
  appSelector,
}) => {
  const _subMenu = subsections => {
    if (!subsections) {
      return null;
    }
    return (
      <div className={styles.submenu}>
        {subsections.map(({name, link}) => {
          const active = subsection === name;
          return (
            <SidebarSubItem
              key={name}
              name={name}
              link={prefix + link}
              action={action || null}
              actionHandler={active ? actionHandler : null}
              active={active}>
              {active ? children : null}
            </SidebarSubItem>
          );
        })}
      </div>
    );
  }

  const apps = [].concat(AppsManager.apps()).sort((a, b) => (a.name < b.name ? -1 : (a.name > b.name ? 1 : 0)));

  return <div className={styles.sidebar}>
    <SidebarHeader />
    {appSelector ? <AppsSelector apps={apps} /> : null}

    <div className={styles.content}>
      {sections.map(({
        name,
        icon,
        style,
        link,
        subsections,
      }) => {
        const active = name === section;
        return (
          <SidebarSection
            key={name}
            name={name}
            icon={icon}
            style={style}
            link={prefix + link}
            active={active}>
            {active ? _subMenu(subsections) : null}
          </SidebarSection>
        );
      })}
    </div>
    <div className={styles.footer}>
      <FooterMenu title={'Open Source'}/>
      <FooterMenu
        title={'Docs'}
        items={[
          {title: 'Cloud Code', icon: {name: 'cloudcode', fill: '#5A79AD'}, link: 'http://parseplatform.github.io/docs/ios/guide/'},
          {title: 'iOS', icon: {name: 'apple', fill: '#485D6A'}, link: 'http://parseplatform.github.io/docs/ios/guide/'},
          {title: 'Android', icon: {name: 'android', fill: '#48A966'}, link: 'http://parseplatform.github.io/android/guide/'},
          {title: 'JavaScript', icon: {name: 'javascript', fill: '#E69733'}, link: 'http://parseplatform.github.io/docs/js/guide/'},
          {title: 'REST API', icon: {name: 'rest', fill: '#D36833'}, link: 'http://parseplatform.github.io/docs/rest/guide/'},
          {title: 'Other SDKs', icon: {name: 'ellipses', fill: '#114470'}, link: 'http://parseplatform.github.io/docs/'},
      ]}>
      </FooterMenu>

      <FooterMenu arrowAdjustFactor={-30} items={[
          {title: 'Log Out', emoji: '👋', sameWindow: true, link: `${mountPath}logout`},
          {title: 'Server Wiki', emoji: '📚', link: 'https://github.com/ParsePlatform/parse-server/wiki'},
          {title: 'Questions on SO', icon: {name: 'overflow', fill: '#DF6F2F'}, link: 'http://stackoverflow.com/questions/tagged/parse-server'},
          {title: 'Server Maintenance', icon: {name: 'overflow', fill: '#DF6F2F'}, link: 'http://serverfault.com/tags/parse'},
        ]}>
      </FooterMenu>
    </div>
  </div>
}

Sidebar.contextTypes = {
  generatePath: React.PropTypes.func
};

export default Sidebar;
