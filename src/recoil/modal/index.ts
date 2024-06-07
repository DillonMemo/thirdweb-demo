import { atom } from 'recoil'

export const isEditProfileModalState = atom<boolean>({
  key: 'isEditProfileModal',
  default: false,
})
