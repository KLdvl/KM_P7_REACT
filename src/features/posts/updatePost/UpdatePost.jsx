import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {serverUrl} from '../../variables/variables'

export function UpdatePost(props) {
    const parsedStorage = JSON.parse(localStorage.user)

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
            url: `${serverUrl}/post/${props.idParams}`,
            mode: 'cors',
            headers: {
                'Authorization': `token ${parsedStorage.token}`
            }
        })
            .then(res => {
                console.log(res.data)
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
            props.showError(null);

            const payload = {
                "title": state.title,
                "content": state.content,
                "image": image,
                "userId": parsedStorage.userId
            }

            axios({
                method: 'put',
                url: `${serverUrl}/post/${props.idParams}`,
                mode: 'cors',
                data: payload,
                headers: {
                    'Authorization': `token ${parsedStorage.token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(res => {
                    if (res.status === 200) {
                        setState(prevState => ({
                            ...prevState,
                            'successMessage': 'Post modification successfull. Redirecting to post page'
                        }))
                        redirectToHome();
                        props.showError(null)
                    } else {
                        props.showError("Some error occured")
                    }
                })
                .catch(err => console.error(err))
        } else {
            props.showError('Please enter a title and content')
        }
    }

    const navigate = useNavigate()
    const redirectToHome = () => {
        navigate('/')
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
                    {show ? <img src={imageURL} alt="Uploaded Image"/> : null}
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Update your post
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none'}}
                 role="alert">{state.successMessage}</div>
        </div>
    )
}