//We redirect the local API calls to the Riot API, each region has its own servers, so we must make a proxy rule per region (11 in total)
//We also inject our API key to autenthicate the app
module.exports = {
  devServer: {
    proxy: {
      "^/api/BR": {
        target: "https://br1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/BR/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/EUNE": {
        target: "https://eun1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/EUNE/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/EUW": {
        target: "https://euw1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/EUW/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/LAN": {
        target: "https://la1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/LAN/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/LAS": {
        target: "https://la2.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/LAS/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/NA": {
        target: "https://na1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/NA/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/OCE": {
        target: "https://oc1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/OCE/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/RU": {
        target: "https://ru.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/RU/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/TR": {
        target: "https://tr1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/TR/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/JP": {
        target: "https://jp1.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/JP/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
      "^/api/KR": {
        target: "https://kr.api.riotgames.com",
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: function(path,req) {
          var replacedPath = path;
          replacedPath = path.replace('/api/KR/','/');
          replacedPath = replacedPath.concat(`?api_key=${process.env.RIOT_API_KEY}`)
          console.log(`Replaced ${path} with ${replacedPath}`);
          return replacedPath;
        }
      },
    }
  }
};
