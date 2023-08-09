
export function TrazitModelFunctions(base) {
    return class extends (base) {
        getProcInstanceModel(procInstanceName){
            console.log('getProcInstanceModel')
        }
    }
}