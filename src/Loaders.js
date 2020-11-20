export const GameLoader = async () => {
    const component = await import("./screens/Game.svelte");
    return component.default;
};