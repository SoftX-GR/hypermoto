import React from 'react';
import { StyleSheet, css } from 'aphrodite/no-important';
import { Strings } from '../i18n/strings';
import App from '../App';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <header className={css(styles.headerContainer)}>
                {Strings.Home} | Notifications
            </header>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        padding: 10,
        borderBottom: `1px solid ${App.colors.frameBorders}`,
        color: 'grey',
        fontFamily: '"Noto Sans"'
    }
});
