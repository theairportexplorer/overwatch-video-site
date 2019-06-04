"""Library for sorting query results by date using the quicksort algorithm

Credit goes to https://en.wikipedia.org/wiki/Quicksort#Lomuto_partition_scheme
and the pseudocode posted there.
"""
import datetime
from random import shuffle

def get_video_date(entry: dict) -> datetime.date:
    return datetime.date.fromisoformat(entry["video_date"])

def _qsort(entries: list, idx_lo: int, idx_hi: int):
    if get_video_date(entries[idx_lo]) < get_video_date(entries[idx_hi]):
        idx_p = partition(entries, idx_lo, idx_hi)
        _qsort(entries, idx_lo, idx_p-1)
        _qsort(entries, idx_p+1, idx_hi)

def qsort(entries: list, idx_lo: int, idx_hi: int):
    # qsort needs work; the Lomuto breaks with repeated elements
    return
    if len(entries) < 4:
        return
    shuffle(entries)
    _qsort(entries, idx_lo, idx_hi)

def partition(entries: list, idx_lo: int, idx_hi: int):
    pivot_date = get_video_date(entries[idx_hi])
    i = idx_lo
    for j in [idx + idx_lo for idx in range(idx_hi - idx_lo)]:
        if get_video_date(entries[j]) < pivot_date:
            tmp = entries[j]
            entries[j] = entries[i]
            entries[i] = tmp
            i += 1
    tmp = entries[idx_hi]
    entries[idx_hi] = entries[i]
    entries[i] = tmp
    return i