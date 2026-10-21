import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'

const config = [
    ...nextVitals,
    prettier,
    { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
    {
        rules: {
            // Existing event-driven and Redux integration patterns remain valid.
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/refs': 'off',
            'react-hooks/purity': 'off',
        },
    },
]

export default config
