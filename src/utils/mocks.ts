import { fakerEN_US as faker } from '@faker-js/faker/.';

export const mockMeaning = () => {
    return {
        text: faker.lorem.sentence(),
    };
};

export const mockWord = () => {
    return {
        word: faker.word.noun(),
        meanings: [mockMeaning(), mockMeaning(), mockMeaning()],
    };
};
