
const handleApiCall = (req,res) => {
    // API Keys //////////////////////////////////////////////////////////////////////
    const PAT = process.env.CLARIFAI_PAT;
    const USER_ID = process.env.CLARIFAI_UID;    
    const APP_ID = process.env.CLARIFAI_APP_ID;
    const MODEL_ID = process.env.CLARIFAI_MODEL_ID;
    const MODEL_VERSION_ID = process.env.CLARIFAI_MODEL_VID;  
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