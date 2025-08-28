import React from 'react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contacts-container">
          <h2>Contact Us</h2>
          <form className='contact-form'>
              <input type="text" placeholder='Your Name' required/>
              <input type="email" placeholder='Your Email' required/>
              <input type="number" name="number" placeholder='Your Number' required/>
              <textarea name="message" rows="5" placeholder='Your Message'></textarea>
              <button type='submit'>Send Message</button>
          </form>
      </div>
    </div>
  )
}

export default Contact