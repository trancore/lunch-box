// leafletのIcon.Defaultに_getIconUrlプロパティを追加
declare module 'leaflet' {
  namespace Icon {
    interface Default {
      _getIconUrl?: string;
    }
  }
}

export {};
