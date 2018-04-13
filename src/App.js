import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { post } from 'axios'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from 'cloudinary-react'

const cloudName = 'use-your-account-cloudname'
const preset = 'use-your-upload-preset-id'
const URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`

class App extends Component {
  state = {
    file: null,
    publicId: 'sample'
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.state.file
      ? this.fileUpload(this.state.file).then(publicId => {
          console.log('publicId : ', publicId)
          publicId && this.setState({ publicId, error: null })
        })
      : this.setState({ error: 'Vous n\'avez pas selectionné de fichier' })
  }

  onChange = file => this.setState({ file })

  handleErrors = response => {
    console.log('response : ', response)

    if (!response.ok) {
      this.setState({ url: null, error: response.statusText })
    }
    return response
  }

  fileUpload(file) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', preset)

    // return post('/upload', formData).then(data => data.url)
    return (
      fetch(URL, { method: 'POST', body: formData, cors: true })
        // !!! ne pas ajouter de Headers content-type
        .then(this.handleErrors)
        .then(r => r.json())
        .then(data => data.public_id)
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={e => this.onChange(e.target.files[0])} />
          <button type="submit">Upload</button>
        </form>
        <Image
          cloudName="dewgv0qfh"
          publicId={ this.state.publicId }
          width="300"
          crop="scale"
        />
        {this.state.error && <p>Erreur : {this.state.error}</p>}
      </div>
    )
  }
}

export default App
