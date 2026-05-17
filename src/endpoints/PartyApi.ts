import { IRiotClient } from '../types/Base/IRiotClient';
import { RequestOptions } from '../types/Base/RequestOptions';
import { Region } from '../types/Shared/ValorantType';

import {
  PartyInviteResponse,
  PartyJoinByCodeResponse,
  PartyResponse,
} from '../types/Party/Party';

export class PartyApi {
  private client: IRiotClient;

  constructor(client: IRiotClient) {
    this.client = client;
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party)
   * 
   * Get the party information for the given party ID.
   */
  public async getParty(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}`,
      {
        method: 'GET',
        signal: options?.signal,
      }
    );
  }

  /**
   * Remove a player from a party.
   */
  public async leaveFromParty(region: Region, partyId: string, playerId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/members/${playerId}`,
      {
        method: 'DELETE',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/change-queue)
   * 
   * Change the queue for the party
   */
  public async changeQueue(region: Region, partyId: string, queueId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/queue`,
      {
        method: 'POST',
        data: { queueID: queueId },
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/set-party-accessibility)
   * 
   * Set the accessibility of the party
   */
  public async setPartyAccessibility(region: Region, partyId: string, accessibility: 'OPEN' | 'CLOSED', options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/accessibility`,
      {
        method: 'POST',
        data: { accessibility: accessibility },
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-generate-code)
   * 
   * Generate an invite code for the party
   */
  public async generatePartyCode(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/invitecode`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-disable-code)
   * 
   * Disable the invite code for the party
   */
  public async disablePartyCode(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/invitecode`,
      {
        method: 'DELETE',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-invite)
   * 
   * Invite a friend to the party by Riot ID name and tagline.
   */
  public async inviteFriend(
    region: Region,
    partyId: string,
    name: string,
    tagline: string,
    options?: RequestOptions
  ) {
    const encodedName = encodeURIComponent(name);
    const encodedTagline = encodeURIComponent(tagline);

    return this.client.requestGLZ<PartyInviteResponse>(
      region,
      `parties/v1/parties/${partyId}/invites/name/${encodedName}/tag/${encodedTagline}`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-join-by-code)
   * 
   * Join a party by code
   */
  public async joinPartyByCode(region: Region, code: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyJoinByCodeResponse>(
      region,
      `parties/v1/players/joinbycode/${code}`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/party-set-member-ready)
   * 
   * Set the ready status of a player in the current party
   */
  public async setMemberReady(region: Region, partyId: string, puuid: string, ready: boolean, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/members/${puuid}/setReady`,
      {
        method: 'POST',
        data: { ready: ready },
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/enter-matchmaking-queue)
   * 
   * Enter the matchmaking queue for the party
   */
  public async enterMatchmakingQueue(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/matchmaking/join`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/leave-matchmaking-queue)
   * 
   * Leave the matchmaking queue for the party
   */
  public async leaveMatchmakingQueue(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/matchmaking/leave`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * [API Docs](https://valapidocs.techchrism.me/endpoint/start-custom-game)
   *
   * Start a custom game
   */
  public async startCustomGame(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/startcustomgame`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * Convert the party back to a default (non-custom) queue
   */
  public async convertToDefault(region: Region, partyId: string, queueId?: string, options?: RequestOptions) {
    const query = queueId ? `?queueID=${encodeURIComponent(queueId)}` : '';
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/converttodefault${query}`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * Convert the party into a custom game lobby
   */
  public async makeCustomGame(region: Region, partyId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/makecustomgame`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * Transfer party ownership to another member
   */
  public async transferOwner(region: Region, partyId: string, playerId: string, options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/members/${playerId}/owner`,
      {
        method: 'POST',
        signal: options?.signal,
      }
    );
  }

  /**
   * Set the preferred game pods for the party
   */
  public async setPreferredGamePods(region: Region, partyId: string, gamePodIds: string[], options?: RequestOptions) {
    return this.client.requestGLZ<PartyResponse>(
      region,
      `parties/v1/parties/${partyId}/preferredgamepods`,
      {
        method: 'POST',
        data: { GamePodIDS: gamePodIds },
        signal: options?.signal,
      }
    );
  }
}
