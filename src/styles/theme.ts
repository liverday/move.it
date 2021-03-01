export interface Theme {
    white: string;
    background: string;
    grayLine: string;
    grayLineDark: string;
    text: string;
    textHighlight: string;
    title: string;
    red: string;
    green: string;
    blue: string;
    blueDark: string;
    blueTwitter: string;

    overlay: string;
}

export const themes: { [key: string]: Theme } = {
    light: {
        white: '#fff',
        background: '#f2f3f5',
        grayLine: '#dcdde0',
        grayLineDark: '#f0f1f3',
        text: '#666',
        textHighlight: '#b3b9ff',
        title: '#2e384d',
        red: '#e83f5b',
        green: '#4cd62b',
        blue: '#5965e0',
        blueDark: '#4953b8',
        blueTwitter: '#2AA9E0',
        overlay: 'rgba(242, 243, 245, 0.8)'
    },
    dark: {
        white: '#222',
        background: '#151515',
        grayLine: '#333',
        grayLineDark: '#151515',
        text: '#fdfdfd',
        textHighlight: '#c8ccfe',
        title: '#fff',
        red: '#ee788c',
        green: '#6fde55',
        blue: '#7a83e6',
        blueDark: '#6d75c6',
        blueTwitter: '#2AA9E0',
        overlay: 'rgba(0, 0, 0, 0.9)'
    }
}