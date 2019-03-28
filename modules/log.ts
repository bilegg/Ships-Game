export default function log(target: any, name: string, descriptor: any) {
    var originalMethod = descriptor.value
    descriptor.value = function (...args: any[]) {
        var result = originalMethod.apply(this, args);
        console.log(result)
    }
}

