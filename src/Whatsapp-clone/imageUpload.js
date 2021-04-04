import { Button } from '@material-ui/core';
import React, { useState } from 'react'

import firebase from '../firebase'
// db
import { db , storage } from '../firebase';
function imageUpload({username}) {

    const [image, setimage] = useState(null);
    // const [text, settext] = useState('');
    const [progress, setprogress] = useState(0)

    const handleChange = (e) => {
        if (e.target.files[0]){
            setimage(e.target.files[0])
        }
    };


    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // progress function...

                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )

                setprogress(progress);
            },
            (error) => {
             console.log(error);
             alert(error.message);
            },
            
            () => {
                // complete function
                storage 
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    // post image to db

                    db.collection('rooms').doc(roomId).collection('images')
                    .add({
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                        // caption : caption,
                        imageUrl : url,
                        username : username,
                    });
                    
                    setprogress(0);
                    settext('');
                    setimage(null);
                    // setavatar(null);
                })
            }
        )
    }

    return (
        <div>
            {/* input  */}
            {/* <input type = 'text' placeholder = 'Enter a Text..' onChange = {event => setcaption(event.target.value) } ></input> */}
            <input
                        type="file"
                        id="share_img"
                        onChange = {handleChange}
                      />
                      <Button onClick = {handleUpload}></Button>
        </div>
    )
}

export default imageUpload
