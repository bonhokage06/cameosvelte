import { writable } from 'svelte/store';
import { load_image } from './utils';
function createStore() {
  const { subscribe, set, update } = writable({
    celebs: { data: [], lookup: new Map(), selected: [] },
  });
  return {
    subscribe,
    load: async () => {
      try {
        const response = await fetch(
          "https://cameo-explorer.netlify.app/celebs.json"
        );
        const data = await response.json();
        const lookup = new Map();
        data.forEach(c => {
          lookup.set(c.id, c);
        });
        const subset = new Set();
        data.forEach(c => {
          if (c.reviews >= 50) {
            subset.add(c);
            c.similar.forEach(id => {
              subset.add(lookup.get(id));
            })
          }
        })
        set({ celebs: { data: Array.from(subset), lookup }, isLoading: true });
        return true;
      } catch (error) {
        return false;
      }
    },
    selection: async (slug) => {
      const { select } = await import("./select")
      update(state => {
        const { data, lookup } = state.celebs;
        const selected = select(data, lookup, slug);
        return {
          celebs: { data, lookup, selected }
        }
      })
    },
    get_celeb_details: (selected) => {
      return selected.map(round => Promise.all([load_celeb_details(round.a), load_celeb_details(round.b)]))
    }

  }
}
const load_celeb_details = async (celeb) => {
  const res = await fetch(`https://cameo-explorer.netlify.app/celebs/${celeb.id}.json`);
  const details = await res.json();
  //wait for image to load
  await load_image(details.image);
  return await details;
}
export const store = createStore();