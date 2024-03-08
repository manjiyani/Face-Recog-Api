
const handleApiCall = (req,res) => {
    // API Keys //////////////////////////////////////////////////////////////////////
    const PAT = '32d71b66a012406e96284375e81ec617';
    const USER_ID = 'al1m';       
    const APP_ID = 'face-detector-react';
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
    //////////////////////////////////////////////////////////////////////////////////

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": req.body.input
                    }
                }
            }
        ]
      });
  
      const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
      };

      fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
        .then(data => data.json())
        .then(result => res.send(result))
        .catch(err => {
            res.status(400).json("Unable to Call API");
        })

}


const handleImage = (req,res, db) => {

    const { id } = req.body;
   db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json("Error updating entries"))
    
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}