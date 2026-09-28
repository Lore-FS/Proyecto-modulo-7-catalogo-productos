import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const lightTheme = {
    dark: false,
    colors: {
        primary: '#2563eb',
        secondary: '#06D6A0',
        background: '#f2f5f8',
        surface: '#ffffff',
        error: '#991B1B'
    }
}

const darkTheme = {
    dark: true,
    colors: {
        primary: '#6EA8D1',
        secondary: '#06D6A0',
        background: '#091220',
        surface: '#1E293B',
        error: '#991B1B'
    }
}

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme:'lightTheme',
        themes:{
            lightTheme,
            darkTheme
        }
    }
})