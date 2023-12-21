const local = {
   id: localStorage.getItem('id'),
   role: localStorage.getItem('lero'),
   env: localStorage.getItem('env'),
   status: localStorage.getItem('status'),
}

const idUser = () => {
   return local.id
}

/*
   env = 1 => internal
   env = 2 => external

   role = 1 => user
   role = 2 => admin
   role = 3 => super admin
---------------------------------
   Now : env = 1 && role = 1 return 11
         env = 1 && role = 2 return 12
         :::
         :::
         env = 2 && role = 1 return 21
*/

export const statusAccess = () => {
   if (local.status !== 'gt6m06768-rq0835gdgd-bvdf56-45rds4mbvpo') {
      return 0
   }
   else {
      if (local.env === 'fkc76rew4-sef590kmlkm-1drds4w323-tpfz6r6') {
         if (local.role === 'zg450354b-2d9cv-4a42-904b-1700f57863d5') {
            return 11
         }
         else if (local.role === 'zg450354b-2d9cv-4a42-904b-2700f57863d5') {
            return 12
         }
         else if (local.role === 'zg450354b-2d9cv-4a42-904b-3700f57863d5') {
            return 13
         }
      }
      else if (local.env === 'fkc76rew4-sef590kmlkm-2drds4w323-tpfz6r6') {
         if (local.role === 'zg450354b-2d9cv-4a42-904b-1700f57863d5') {
            return 21
         }
         else if (local.role === 'zg450354b-2d9cv-4a42-904b-2700f57863d5') {
            return 22
         }
         else if (local.role === 'zg450354b-2d9cv-4a42-904b-3700f57863d5') {
            return 23
         }
      }
   }
}

export const access = {
   idUser,
   statusAccess
}