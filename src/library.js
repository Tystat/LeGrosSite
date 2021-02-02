import {globalAPIQueu} from './main.js'

// Handle the api queue limitations by delaying each call by numberofcurrentcalls*50ms
// to stay under 20 call per second.Also handle the parsing of the JSON response to avoid clutter in the code
export function riotAPICall(request,callback) {
  // Add a call to the current API queue
  globalAPIQueu.APIRequests += 1;
  // Timeout 50ms for each requests in the queue
  setTimeout(()=>{
    // Make the API request
    fetch(request)
    .then((response)=>{
      // Remove the request from the queue as it is done
      globalAPIQueu.APIRequests -= 1;
      // Parse the response
      return response.json();
    })
    .then((data)=>{
      // Execute the given callback with the parsed API response
      callback(data);
    })
  },50*globalAPIQueu.APIRequests)
}
