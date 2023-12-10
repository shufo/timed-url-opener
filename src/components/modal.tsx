import { Icon } from "@primer/octicons-react"
import React, { FC } from "react"

type Props = {
  id: string
  icon: Icon
  lead: string
  body: string | JSX.Element
}

export const Modal: FC<Props> = ({ id, icon, lead, body }) => {
  return (
    <>
      <input type="checkbox" id={id} className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="text-lg font-bold">
            <>
              {icon}
              <span className="ml-2">{lead}</span>
            </>
          </h3>
          <div className="py-4">{body}</div>
        </div>
        <label className="modal-backdrop" htmlFor={id}></label>
      </div>
    </>
  )
}
