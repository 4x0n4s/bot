import { APIApplication } from 'discord-api-types/v10';
import { Client, Team, User } from '@lib/index';

export interface ClientType {
    /** Connects the client*/
    connect: () => void;
}

export interface ClientUserType extends UserType {

}

export interface UserType {
    /** This user ID */
    ID: Snowflake;
    /** This user Name */
    userName: string;
    /** This user Global Name */
    globalUserName: string | null;
    /** This user avatar (hash) */
    avatar: string | null;
    /** This user banner (hash) */
    banner: string | null;
    /** This user is a Bot? */
    isBot: boolean;
    /** This user PreniumType (nitro) */
    premiumType: number | null;
}

export interface ButtonCollectorType {
    /** The different customsIDs of this Collector (an Array)*/
    customsIDs: array;
    /** The different usersIDs can access of this Collector (an Array)*/
    usersIDs: array;
    /** Enable/Disable the messageAutoUpdate (Refresh the message)*/
    autoUpdate: boolean;
    /** Set the code that will be executed when the button is clicked*/
    setCallback: (interaction: ButtonInteraction) => this;
}

export interface ApplicationType {
    /** The Application ID*/
    ID: Snowflake;
    /** The Application Owner*/
    owner: User | null;
    /** The Application Description*/
    description: string;
    /** The Application Team (members, icon, name)*/
    team: Team | null;
    /** This Application is Public?*/
    isPublic: boolean;
}