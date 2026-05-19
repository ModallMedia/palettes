import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      'react-hooks/immutability': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default config
