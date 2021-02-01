import { BadRequestException } from '@nestjs/common';
import { CreateUserInput, UpdateUserInput } from '../user/user.inputs';
import validator from 'validator';

import {
    CreateMessageInput,
    UpdateMessageInput,
} from 'src/messages/messages.inputs';

/**
 * Check that the email entered has a valid format.
 * It will return null if there is no problem, otherwise it will return an exception.
 * @param { string } email Email entered by user
 * @returns { null | BadRequestException }
 */
function validateEmail(email: string): null | BadRequestException {
    if (email && !validator.isEmail(email)) {
        return new BadRequestException(
            "The email format isn't valid",
            'EMAIL_INVALID',
        );
    }

    return null;
}

/**
 * Check that the password meets the minimum requirements.
 * It will return null if there is no problem, otherwise it will return an exception.
 * @param { string } password Password entered by user
 * @returns { null | BadRequestException }
 */
function validatePassword(password: string): null | BadRequestException {
    if (password && !validator.isLength(password, { min: 8, max: 256 })) {
        return new BadRequestException(
            'Password lenght must be between 8 and 256 characters.',
            'PASSWORD_INVALID',
        );
    }
}

/**
 * Check that the username meets the minimum requirements.
 * It will return null if there is no problem, otherwise it will return an exception.
 * @param { string } username Username entered by user
 * @returns { null | BadRequestException }
 */
function validateUsername(username: string): null | BadRequestException {
    if (username && !validator.isLength(username, { min: 4, max: 32 })) {
        return new BadRequestException(
            'Username length must be between 4 and 32 characters.',
            'USERNAME_INVALID',
        );
    } else if (
        username &&
        !validator.isAlphanumeric(username.replace(/_/g, ''))
    ) {
        return new BadRequestException(
            'Username only can contains A-Z a-z 0-9 _.',
            'USERNAME_INVALID',
        );
    }
}

function validateMessageContent(content: string) {
    if (!validator.isLength(content, { min: 1, max: 2000 })) {
        return new BadRequestException(
            'Message length must be between 1 and 2000 characters.',
            'MESSAGE_CONTENT_TOO_LONG',
        );
    }
}

export function validateMessagePayload(
    payload: CreateMessageInput | UpdateMessageInput,
) {
    return validateMessageContent(payload.content);
}

export function validateUserPayload(
    payload: CreateUserInput | UpdateUserInput,
) {
    return (
        validateEmail(payload.email) ||
        validatePassword(payload.password) ||
        validateUsername(payload.username)
    );
}
