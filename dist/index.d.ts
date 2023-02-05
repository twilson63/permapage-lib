declare const _default: Readonly<{
    init: () => {
        /**
         * @param {any} page
         */
        generateHTML: (page: any) => Promise<string>;
        /**
         * @param {string} html
         */
        extractModel: (html: string) => Promise<any>;
    };
}>;
export default _default;
