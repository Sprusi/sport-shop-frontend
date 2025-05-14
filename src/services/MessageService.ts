import { message } from 'antd';

import { ActionMessages } from '@/constants';

export class MessageService {
  static success(text = ActionMessages.SUCCESS) {
    message.success(text);
  }

  static warn(text = ActionMessages.ERR_DEFAULT) {
    message.warning(text);
  }

  private static errorDisplayed = false;
  public static error(text = ActionMessages.ERR_DEFAULT, error?: Error) {
    console.error(error);
    if (this.errorDisplayed) return;

    this.errorDisplayed = true;
    const messageContent = typeof text === 'string' ? text : ActionMessages.ERR_DEFAULT;
    message.error({ content: messageContent, duration: 7 });
    setTimeout(() => {
      this.errorDisplayed = false;
    }, 3000);
  }
}
