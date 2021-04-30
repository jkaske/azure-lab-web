import React from "react"
import ErrorBase from "./ErrorBase"

const PostImagesInternalServerErrorComponent: React.FC = () => {
  return (
    <ErrorBase heading="Internal Server Error (500)">
      <ul>
        <li>
          If your backend expects to receive the raw image bytes, make sure to{" "}
          <strong>not</strong> check the checkbox in this form
        </li>
        <li>
          If your backend expects a base64 encoded image, make sure the checkbox
          in this form is checked
        </li>
      </ul>
    </ErrorBase>
  )
}

export default PostImagesInternalServerErrorComponent
