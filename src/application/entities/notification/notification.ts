import { Replace } from 'src/helpers/Replace'
import { Content } from './content'
import { randomUUID } from 'node:crypto'

export interface NotificationProps {
  recipientId: string
  content: Content
  category: string
  readAt?: Date | null
  canceledAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export class Notification {
  private _id: string
  private props: NotificationProps

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: string
  ) {
    const newDate = new Date()

    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      createdAt: props.createdAt ?? newDate,
      updatedAt: props.updatedAt ?? newDate,
    }
  }

  public get id() {
    return this._id
  }

  public set recipientId(recipientId: string) {
    this.props.recipientId = recipientId
  }

  public get recipientId(): string {
    return this.props.recipientId
  }

  public set content(content: Content) {
    this.props.content = content
  }

  public get content(): Content {
    return this.props.content
  }

  public set category(category: string) {
    this.props.category = category
  }

  public get category(): string {
    return this.props.category
  }

  public read() {
    this.props.readAt = new Date()
  }

  public unread() {
    this.props.readAt = null
  }

  public get readAt(): Date | null | undefined {
    return this.props.readAt
  }

  public cancel() {
    this.props.canceledAt = new Date()
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt
  }

  public get createdAt(): Date {
    return this.props.createdAt
  }

  public get updatedAt(): Date {
    return this.props.updatedAt
  }
}
