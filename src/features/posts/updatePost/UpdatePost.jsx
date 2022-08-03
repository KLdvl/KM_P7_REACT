import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {serverUrl} from '../../variables/variables'

export function UpdatePost() {
    const parsedStorage = JSON.parse(localStorage.user)
    let {id} = useParams()

    const [state, setState] = useState({
        title: "",
        content: "",
        successMessage: null
    })

    const [image, setImage] = useState(undefined)
    const [imageURL, setImageURL] = useState()
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (!image) return
        setImageURL(URL.createObjectURL(image))
    }, [image])

    const onImageChange = (e) => {
        setImage(...e.target.files)
        setShow(true)
    }

    const handleChange = (e) => {
        const {id, value} = e.target
        setState(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const getPostData = () => {
        axios({
            method: 'get',
            url: `${serverUrl}/post/${id}`,
            mode: 'cors',
            headers: {
                'Authorization': `token ${parsedStorage.token}`
            }
        })
            .then(res => {
                setState(prevState => ({
                    ...prevState,
                    title: res.data.title,
                    content: res.data.content,
                }))
            }
            )
    }
    useEffect(()=> {
        getPostData()
    }, [])

    const sendDetailsToServer = () => {
        if (state.title.length && state.content.length) {

            const payload = {
                "title": state.title,
                "content": state.content,
                "image": image,
                "userId": parsedStorage.userId
            }

            axios({
                method: 'put',
                url: `${serverUrl}/post/${id}`,
                mode: 'cors',
                headers: {
                    'Authorization': `token ${parsedStorage.token}`,
                    "Content-Type": "multipart/form-data"
                },
                data: payload,
            })
                .then(window.location = `/${id}`)

        }
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()
    }

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label>Title of post :</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="Enter your title"
                        value={state.title}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label>Content :</label>
                    <input
                        type="text"
                        placeholder="Enter your content"
                        id="content"
                        className="form-control"
                        value={state.content}
                        onChange={handleChange}
                    />
                    <label>Image :</label>
                    <input
                        type="file"
                        className="form-control"
                        onChange={onImageChange}
                    />
                    {show ? <img src={imageURL} alt=""/> : null}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Update your post
                </button>
            </form>
        </div>
    )
}