# coding: utf-8
from common.config import GPU


if GPU:
    import cupy as np  # type: ignore[import-not-found]
    np.cuda.set_allocator(np.cuda.MemoryPool().malloc)
    if not hasattr(np.add, 'at'):
        # 구버전 cupy 대응 (cupy 14부터는 cupy.add.at 이 기본 제공됨)
        np.add.at = np.scatter_add

    print('\033[92m' + '-' * 60 + '\033[0m')
    print(' ' * 23 + '\033[92mGPU Mode (cupy)\033[0m')
    print('\033[92m' + '-' * 60 + '\033[0m\n')
else:
    import numpy as np