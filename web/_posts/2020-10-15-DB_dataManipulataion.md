```sql
select * from employees e, departments d
order by EMPLOYEE_ID; --카르테시안 조인
```

이렇게 하면 107*27의 결과가 나온다. 우리가 원하는게 아니다.

# TABLE JOIN

두 테이블이 PK, FK 의 관계를 가지고 있으면 join을 할 수 있다.

```sql
select first_name ,salary from employees; -- eid(pk), did(fk), 자 다
select department_name from departments; -- did(pk), 부
select first_name, department_name , salary
from employees e, departments d
where d.department_id = e.department_id;-- 이 문장이 빠지면 카르테시안 조인이 나온다. 
```



## EQUI JOIN

```sql
--부서명 주소를 조회하는 쿼리를 작성
select d.DEPARTMENT_NAME,l.STREET_ADDRESS || l.CITY || ' ' || l.STATE_PROVINCE  ADDRESS from departments d, locations l
where d.location_id = l.location_id;

--이렇게 쓰는 것도 위와 똑같은 결과가 나온다.(SQL99 표준)
SELECT d.DEPARTMENT_NAME, l.CITY, l.STREET_ADDRESS
FROM DEPARTMENTS d JOIN locations l  USING(location_id); --컬럼 이름이 같으면 굳이 두번 명시해주지 않아도 되어서 USING 을 쓰는게 편하다. ON은 컬럼명이 다를 때
SELECT d.DEPARTMENT_NAME, l.CITY, l.STREET_ADDRESS
FROM DEPARTMENTS d JOIN locations l ON (d.location_id = l.location_id);
```

```sql
--부서명, 부서장 이름을 조회하는 쿼리를 작성
select d.DEPARTMENT_NAME || ' 의 팀장은' || e.first_name  || ' 입니다.' AS "MANAGER OF EACH DEPARTMENT" from departments d, employees e
where e.employee_id = d.manager_id;

--부서명, 부서장 이름을 조회하는 쿼리를 작성 (LEFT OUTER JOIN 사용)
select d.DEPARTMENT_NAME || ' 의 팀장은' || e.first_name  || ' 입니다.' AS "MANAGER OF EACH DEPARTMENT" 
from departments d LEFT OUTER JOIN employees e ON (e.employee_id = d.manager_id)
ORDER BY FIRST_NAME;
```

```sql
-- 직원명(e) start_date ~ end_Date(h) (d)
select e.first_name ,h.start_date || '~' || h.end_date ,d.department_name from employees e, job_history h, departments d
where e.employee_id = h.employee_id and e.department_id = d.DEPARTMENT_ID;
```



## NOT EQUI JOIN



## SELF JOIN

같은 표에서 조인한는 것.

```sql
--사원명, 매니저명
SELECT E1.FIRST_NAME || ' 사원의 매니저는 ' || E2.FIRST_NAME || ' 입니다.' as manager
FROM EMPLOYEES E1,  EMPLOYEES E2
WHERE E1.MANAGER_ID = E2.EMPLOYEE_ID(+)
order by E1.FIRST_NAME;
```



## OUTER JOIN

셋째줄 **WHERE E1.MANAGER_ID = E2.EMPLOYEE_ID(+)** 

```sql
--사원명, 매니저명
SELECT E1.FIRST_NAME || ' 사원의 매니저는 ' || E2.FIRST_NAME || ' 입니다.' as manager
FROM EMPLOYEES E1,  EMPLOYEES E2
WHERE E1.MANAGER_ID = E2.EMPLOYEE_ID(+) --(+)표시는, NULL일때도 출력해달라는 뜻.
order by E1.FIRST_NAME;
```



```sql
select first_name, department_name , salary
from employees e, departments d
where d.department_id(+) = e.department_id; -- RIGHT JOIN
--기준이 되는 쪽 RIGHT 이라서 RIGHT JOIN, 그리고 그걸 기준으로 왼쪽을 붙여준다. 그래서 E.DEPARTMENT_ID가 NULL 인 애들도 그대로 나온다.  아니라 반대쪽에 (+)를 붙여준다. 
```

```sql
--department , location, country
select d.department_name, l.street_address, c.country_name from departments d, locations l , countries c
where (d.LOCATION_ID = l.LOCATION_ID) and (l.COUNTRY_ID=c.COUNTRY_ID);

```

```sql
-- 부서명 관리자명 (관리자가 없어도 출력되도록 한다.)
select d.department_name , e.first_name
from departments d left outer join employees e on(e.employee_id = d.manager_id);
```



## INNER JOIN