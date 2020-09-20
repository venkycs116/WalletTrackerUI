module.exports = {    
    plugins: [
      [        
        'transform-object-rest-spread',
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.js', '.ts', '.tsx', '.json'],
          alias: {
            'test/*': './test/',
          },
        },
      ],
    ],
    "env": {
      "production": {
        "plugins": ["transform-remove-console"]
      }
    }
  };
  