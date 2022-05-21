using System.Collections.Generic;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace API.DataAccess
{
    public class PageList<T> : List<T>
    {
        public Data Data {get; set;}
        
        public PageList(List<T> items, int currentPage, int pageSize, int totalCount)
        {
            AddRange(items);
            Data = new Data
            {
                PageSize = pageSize,
                CurrentPage = currentPage,
                TotalPages = (int)Math.Ceiling(totalCount * 1.0 / pageSize),
                TotalCount = totalCount
            };
        }

        public static async Task<PageList<T>> ToPageList(IQueryable<T> query, int pageNumber, int pageSize)
        {
            var count = await query.CountAsync();
            var items = await query.Skip(pageSize * (pageNumber - 1)).Take(pageSize).ToListAsync();
            return new PageList<T>(items, pageNumber, pageSize, count);
        }
    }
}