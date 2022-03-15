export class ToolsService {
    /**
     * Transforme le CamelCame en KebabCase
     * @param string
     */
    static toKebabCase(string: string) {
        return string.split('').map((letter, idx) => {
            return letter.toUpperCase() === letter
                ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
                : letter;
        }).join('');
    }
}
