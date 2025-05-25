export const toTitleCase = (text: string | string[]) =>{

    const toTitle = (str: string) =>{
        const lowecase = str.toLowerCase()
       return lowecase[0].toUpperCase() + lowecase.slice(1)
    }
    if (typeof text === 'string'){
        return toTitle(text)
    }

   const  results = text.map(str => toTitle(str))

   return results.join(" ")
}


export const trimmer = (text: string, length: number) => {
    if (text.length > length) {
        return text.slice(0, length) + '...';
    }
    return text;
}