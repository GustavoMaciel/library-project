import { CrudService } from '../services/crud.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { ModalService } from '../services/modal.service';

export class ViewContext {

    item: any;

    constructor(
        private service: CrudService,
        private router: Router,
        private serviceUrl: string,
        private routerUrl: string,
        private activatedRoute: ActivatedRoute,
        private postGetItem: (item: any) => void,
    ) { }

    getServiceURL(): string {
        return this.serviceUrl;
    }

    getRouterURL(): string {
        return this.routerUrl;
    }

    backToList(): void {
        this.router.navigate([this.getRouterURL()]);
    }

    getParamId(): string {
        return this.activatedRoute.snapshot.paramMap.get('id');
    }

    getItem(): void {
        const id = this.getParamId();
        this.service.getOne(this.getServiceURL(), id).subscribe((res => {
            this.item = res;
            this.postGetItem(this.item);
        }));
    }

}
