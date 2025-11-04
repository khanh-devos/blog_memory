---
category: GPU
archived: true
loadingTypogram: true
---

Special syntaxes of CUDA C++ or C++

1. `(void**)&ptr` : call out the address of the pointer.
   - `(void *)kernelFunc` : similar to (void *)&kernelFunc, casting a C func to a generic pointer that is required individually by CUDA 12+. Why generic? because kernelFunc is a pointer already.
   - What `**` ?: 
      - int a = 10; int* p1 = &a; int** p2 = &p1; (so p2 is a ptr to ptr p1 that points to a). So, void** means kernel wants to modify a ptr.
   
   - CUDA prototype explaination: `cudaError_t cudaMalloc(void **devPtr, size_t size)`
      - What `void*` ?: it is pointer to any type in C++, just generic/general pointer with no specific type or any type is OK.
      - So, `void* *devPtr` is just ptr to ptr, meaning we just want to change the pointer of "devPtr", not the value/address it contains.
         - We can call: `cudaMalloc(&devPtr, size)`, now we exactly have address of devPtr, not the value/address it contains, we can modify/add memory for it.
      - If like this `cudaError_t cudaMalloc(void *devPtr, size_t size)`   
         - Then, we can: `cudaMalloc(devPtr, size)`, so CUDA only take the value that devPtr brings, not its pointer, so CUDA cannot allocate memory for devPtr.
      - NOTE: cudaMalloc() will allocate a space of device memory for a host pointer.
   
   - Same for : `cudaError_t cudaGetSymbolAddress(void **devPtr, const void *symbol);`

2. `float* ptr` vs `float* ptr[2]` vs `float** ptr` vs `float** ptr[2]`:
   - `float* ptr`: ptr is a pointer that points to a single float or array of floats.
   - `float* ptr[2]`: ptr is not a pointer, it is an array of 2 pointers containing float.
   - `float** ptr`: ptr is a pointer that either points another pointer or containing address of another pointer (float** ptr = &another_ptr;)
   - `float** ptr[2]` : an arr of two pointers, each points to another pointer.

3. `ptrs + n`: in C++ or Cuda, we always meet the weird calculation: a array pointer can be added an integer. Well, it's just a short way to call the address of `ptrs[n]` or exactly `&ptrs[n]`.

4. Clamping VS "modulo_wrapping": both of them define a way to distribute data into different bins/groups. For instance, we have nbins = 4 (we divide in to 4 groups: 0,1,2,3):
   - | data              |-2|-1|0|1|2|3|4|5|
   |clamping_binid/group |0 |0 |0|1|2|3|3|3|
   |modulo_binid/group   |2 |3 |0|1|2|3|0|1|
   
   - Modulo (%: phần dư của phép chia hai số nguyên) :  
      - Best suitable for circular/repeating data.
      - Outliers will be distributed evenly around all bins.
      - <pre class="snippet">
         int binid = value % nbins;
         if (binid < 0) binid += nbins; // handle negatives safely
         <pre>

   - Clamping: 
      - Good for bounded data, like image pixels, limited sensor data range.
      - Outliers will be accumulated on edge/border.
      - <pre class="snippet">
         int binid = ldata;
         if (ldata < 0)
            binid = 0;
         else if (ldata >= nbins)
            binid = nbins - 1;
         <pre>

5. `Atomic` operations: refers to an operation that is only executed by one thread until it finishes read-modify-write process safely and fully. For example: int x=0; x = x+1;. If (x=x+1) is not atomic, thread A and B might do the increment at the same time but x might be only 2, not 3 after 2 times of incrementing. So, we need set (x=x+1) atomic.
   - In plain C++ : std::atomic<int> counter{0};
   - In Cuda: `__managed__` cuda::atomic<int, cuda::thread_scope_system> counter(0); (`__managed__` refers to `"unified memory"` that is accessable to both host and device).

   

   

