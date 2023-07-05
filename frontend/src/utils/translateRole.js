export const getShortRolePosition = (role) => {
    if (!role) return null;
    const roles = {
      1: 'GK',  // Вратарь
      2: 'RB/LB',  // Крайний Защитник
      3: 'CD',  // Центральный Защитник
      4: 'RM/LM',  // Крайний полузащитник
      5: 'CM',  // Центральный полузащитник
      6: 'FW'  // Нападающий
    };
    
    const translatedRole = roles[role];
    return translatedRole || null;
}