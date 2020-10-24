import React from 'react'

export default function AlertError(props) {
  return (
    <div className="text-white mt-3 px-6 py-3 border-0 rounded relative mb-2 bg-red-500">
      <span className="inline-block align-middle mr-8">
        <b className="capitalize">{props.attribute}</b> {props.message}
      </span>
    </div>
  )
}