interface PriceRange {
  from: number
  to: number
}

interface Filter {
  name: string
  id: number
}

interface State {
  apartmentTypes: Array<Filter>
  priceRange: PriceRange
  salesStages: Array<Filter>
  currentApartmentTypes: Array<Filter>
  currentSalesStages: Filter | null
}

export const state = (): State => ({
  apartmentTypes: [
    { name: 'Студия', id: 1 },
    { name: '1', id: 2 },
    { name: '2', id: 3 },
    { name: '3', id: 4 },
    { name: '4+', id: 5 },
    { name: 'своб. план', id: 6 },
  ],
  priceRange: {
    from: 0,
    to: Infinity,
  },
  salesStages: [
    { name: 'Любая', id: 1 },
    { name: 'Продано', id: 2 },
    { name: 'Скоро в продаже', id: 3 },
    { name: 'Открыто бронирование', id: 4 },
    { name: 'Идут продажи от застройщика', id: 5 },
  ],
  currentApartmentTypes: [],
  currentSalesStages: null,
})

export const mutations = {
  setPriceRange(state: State, range: PriceRange) {
    state.priceRange = range
  },
  setCurrentApartmentTypes(state: State, types: Array<Filter>) {
    state.currentApartmentTypes = types
  },
  setCurrentSalesStages(state: State, stage: Filter) {
    state.currentSalesStages = stage
  },
}

export const getters = {
  getSalesStages: (s: State) => s.salesStages,
  getApartmentTypes: (s: State) => s.apartmentTypes,
  getPriceRange: (s: State) => s.priceRange,
  getCurrentApartmentTypes: (s: State) => s.currentApartmentTypes,
  getCurrentSalesStages: (s: State) => s.currentSalesStages,
}
