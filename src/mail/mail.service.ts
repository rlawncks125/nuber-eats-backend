import { Inject, Injectable } from '@nestjs/common';
import { MailModuleOptions } from './mail.interfaces';
import { CONFIG_OPTIONS } from '../common/common.constants';
import got from 'got';
import * as FormData from 'form-data';
import { EmailVar } from 'src/jwt/jwt.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private async sendEmail(
    subject: string,
    templateName: string,
    emailVars: EmailVar[],
  ) {
    const form = new FormData();
    form.append('from', `Excited User <mailgun@${this.options.domain}>`);
    form.append('to', `rlawncks74@naver.com`);
    form.append('subject', subject);
    form.append('template', templateName);
    emailVars.forEach((v) => form.append(`v:${v.key}`, v.value));
    // form.append('v:username', 'Templatetest');
    // form.append('v:code', 'codedede');

    try {
      await got(`https://api.mailgun.net/v3/${this.options.domain}/messages`, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(
            `api:${this.options.apikey}`,
          ).toString('base64')}`,
        },
        body: form,
      });
    } catch (error) {
      console.log(error);
    }
  }

  sendVerificationEmail(email: string, code: string) {
    this.sendEmail('Verify Your Email', 'nuber_email_test', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
