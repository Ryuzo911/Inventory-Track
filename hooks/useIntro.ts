import { useStorageState } from "./useStorageState"

const useIntro = () => {
    const [[loading, intro], setIntro] = useStorageState("intro");

    return{
        intro,
        setIntro,
        loading
    };
};

export default useIntro;