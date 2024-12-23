const { Schema, model, models } = require("mongoose");

const WatchListSchema = new Schema({
    userID:{
        type: String,
        required: true
    },
    videoList: {
        type: [
            {
                id: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                poster_path: {
                    type: String,
                    required: false
                },
                release_date: {
                    type: String,
                    required: false
                }
            }
        ],
        default: []
    }
});

export default models?.WatchList || model("WatchList", WatchListSchema);
