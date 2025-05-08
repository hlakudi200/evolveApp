"use client";

import { createContext } from "react";

export interface IEmail {
  to: string;
  cc?:string;
  bcc?:string;
  subject: string;
  body: string;
  isBodyHtml?:boolean;
  attachments?:IAttachments[];
}

export interface IAttachments{
  fileName: string,
  fileBytes: string,
  contentType: string
}

export interface IEmailStateContext {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface IEmailActionContext {
  sendEmail: (email: IEmail) => Promise<void>;
}

export const INITIAL_STATE: IEmailStateContext = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export const EmailStateContext = createContext<IEmailStateContext>(INITIAL_STATE);

export const EmailActionContext = createContext<IEmailActionContext|undefined>(undefined);
