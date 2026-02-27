import EventEmitter from 'eventemitter3';

import { XmppClient } from './XmppClient';
import { XmppRegions } from './XmppEndpoints';
import {
  clientName,
  mechanism,
  rxep,
  setupSession,
  xmlDeclaration,
} from './XmlObjects';

import { parsePASToken } from '../auth';

interface XmppEvents {
  error: (err: Error | unknown) => void;
  ready: () => void;
  closed: () => void;
}

interface XmppRegionObject {
  affinity: string;
  domain: string;
  lookupName?: string;
}

export class RiotXmpp extends EventEmitter<XmppEvents> {
  private client: XmppClient;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  private rsoToken = '';
  private pasToken = '';
  private regionData: XmppRegionObject | null = null;

  constructor() {
    super();
    this.client = new XmppClient();

    this.client.on('error', (err) => {
      this.emit('error', err);
    });
    this.client.on('closed', () => {
      this.stopHeartbeat();
      this.emit('closed');
    });
  }

  public async establishXMPPConnection(RSO: string, PAS: string) {
    try {
      const pasData = parsePASToken(PAS);
      const lookupName = pasData.affinity;
      const region = XmppRegions.findByLookupName(lookupName);

      if (!region) {
        throw new Error(`Unsupported region lookup name: ${lookupName}`);
      }

      this.rsoToken = RSO;
      this.pasToken = PAS;
      this.regionData = region;

      const host = XmppRegions.getHost(region);
      await this.client.connect({ port: 5223, host });
      console.log(`Connected to ${lookupName} (${host})`);

      await this.performHandshake();

      this.client.on('stanza', (stanza: any) => {
        this.handleStanza(stanza);
      });
      this.resetHeartbeat();
      this.emit('ready');
    } catch (e) {
      console.error('Failed to establish XMPP connection:', e);
      this.emit('error', e);
    }
  }

  private async performHandshake() {
    await this.client.sendAndRead(xmlDeclaration(this.regionData!));

    await this.client.sendXmlAndRead(mechanism(this.rsoToken, this.pasToken));

    await this.client.sendAndRead(xmlDeclaration(this.regionData!));

    await this.client.sendXmlAndRead(clientName());

    await this.client.sendXmlAndRead(rxep());

    await this.client.sendXmlAndRead(setupSession());

    console.log('Handshake finished');
  }

  private resetHeartbeat() {
    this.stopHeartbeat();
    this.heartbeatInterval = setInterval(() => this.client.send(' '), 150_000);
  }

  private stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  private handleStanza(parsed: any) {
    const responses = Object.entries(parsed);

    for (const response of responses) {
      const [type, data] = response;
      if (Array.isArray(data)) {
        for (const xmlObj of data) {
          this._handleData(type, xmlObj);
        }
      } else {
        this._handleData(type, data);
      }
    }
  }

  private _handleData(type: string, data: any) {
    switch (type) {
      case 'presence':
        console.log(type, data);
        break;
      case 'message':
        console.log(type, data);
        break;
      case 'iq':
        console.log(type, data);
        break;
    }
  }
}
